#!/usr/bin/env bash
# ==============================================================================
# Automates the packaging and bundling of the bmi.calc application and its core dependencies
# into a distributable tarball (parity with `bun pm pack` but with additional features).
#
# Features:
#   - Safely isolates, builds, and prepares the @bmi-calc/core package.
#   - Modifies the target package.json temporarily to remove development dependencies
#     and scripts for a clean production build.
#   - Utilizes Git stashing to safely preserve uncommitted changes during the pack process.
#   - Uses robust signal trapping to ensure workspace cleanup and restoration of
#     original files even if the process is interrupted.
#   - Set `XTRACE=1` to enable commands trace.
#
# Usage:
#   ./scripts/pack.sh cli [-f|--filename <custom_filename>] [-v|--verbose]
#
# Dependencies:
#   - bash (unix shell)
#   - bun (Javascript runtime and package manager)
#   - git (Version control system for restoring states)
#
# Written by Ryuu Mitsuki (https://github.com/mitsuki31)
# ==============================================================================

set -euo pipefail

# Enable commands trace if XTRACE is set
if [ -n "${XTRACE:-}" ]; then
    set -x
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CORE_PATH="$ROOT/packages/core"

LICENSE_FILE="$ROOT/LICENSE"
VERSION=""  # Assign later

LOG_FILE="/dev/null"  # For commands except log()
TEMP_DIR="$ROOT/tmp/"
BUILD_TEMP_DIR="$TEMP_DIR/build"
FILENAME=""
TARGET=""

VERBOSE_STR=""
QUIET_STR="--quiet"
MODIFIED_PKG=0
MODIFIED_CORE_PKG=0
STASHED_PKG=0
STASHED_CORE_PKG=0
PRESERVED_CORE_NODE_MODULES=0

REMOVE_FIELDS=("devDependencies" "scripts")
INCLUDED_CORE_FILES=("dist" "package.json" "README.md" "LICENSE")

log() {
    printf "\033[2;36m~>\033[0m \033[2m\033[3m%b\033[0m\n" "$@"
}

err() {
    printf "\033[1;31m~>\033[0m \033[31mError: %b\033[0m\n" "$@" >&2
}

# Pre-check: Ensure the script is run from the root workspace
if [ "$(pwd)" != "$ROOT" ]; then
    err "Must be run from the root workspace"
    exit 1
fi

# Parse arguments
parse_args() {
    while [ $# -gt 0 ]; do
        case "$1" in
            cli) {
                TARGET="cli"
                VERSION="$(bun pm --cwd "$ROOT/apps/cli" pkg get version | sed "s/\"//g")"
                shift
            } ;;
            -f|--filename) {
                # Replace version placeholder in filename
                FILENAME=$(
                    printf '%s' "${2:?Argument required for -f/--filename}" \
                        | sed "s/\(%\|{\)ver\(sion\)\?\(%\|}\)/$VERSION/I"
                )
                shift 2
            } ;;
            -v|--verbose) {
                VERBOSE_STR="--verbose"
                QUIET_STR=""
                LOG_FILE="/dev/stdout"
                shift
            } ;;

            # Error handling
            -?|-??|--*) err "Unknown option: $1"; exit 1 ;;
            *) err "Unknown target: $1"; exit 1 ;;
        esac
    done

    if [ -z "$TARGET" ]; then
        err "Target required (cli)"
        exit 1
    elif [ ! -d "$ROOT/apps/$TARGET" ]; then
        err "No directory found for target: $TARGET"
        exit 2
    fi
}

# --- Git functions

git_restore() {
    local pathspec="${1:?Missing Git pathspec}"
    local modified_flag="${2:-0}"

    if (( modified_flag )); then
        log "Restoring $pathspec..."
        git restore $QUIET_STR -- "$pathspec"
    fi
}

git_stash_pop() {
    local stashed_flag="${1:-0}"

    if (( stashed_flag )); then
        log "Applying stashed changes..."
        git stash pop --quiet  # Always quiet
    fi
}

# --- License functions

copy_license() {
    log "Copying license file..."
    cp $VERBOSE_STR -- "$LICENSE_FILE" "${1:?Need path to copy license to}"
}

remove_license() {
    if [ -n "${1:-}" ] && [ -f "$1/LICENSE" ]; then
        log "Removing license file: $1/LICENSE..."
        rm $VERBOSE_STR -- "$1/LICENSE"
    fi
}

# --- Core package functions

pre_build_core_pkg() {
    [ -d "$CORE_PATH" ] || { err "No core package found"; exit 1; }

    # Check if the core package has changes
    if ! git diff --quiet "$CORE_PATH"; then  # <- Always quiet
        log "Stashing core package..."
        git stash push                                    \
            --keep-index                                  \
            --include-untracked                           \
            --message "prepack(core): stash core package" \
            $QUIET_STR                                    \
            -- "$CORE_PATH"

        STASHED_CORE_PKG=1
    else
        log "No changes in @bmi-calc/core package.json"
    fi
}

build_core_pkg() {
    pre_build_core_pkg

    log "Building @bmi-calc/core package..."
    bun run --filter "@bmi-calc/core" build > "$LOG_FILE"
}

prepare_core_pkg() {
    build_core_pkg

    log "Preparing @bmi-calc/core package..."
    # Copy license file
    copy_license "$CORE_PATH"

    while IFS= read -r -d '' file; do
        local keep=0
        local temp_dir="$BUILD_TEMP_DIR/@bmi-calc.core"

        # Preserve node_modules directory and copy it to a temporary directory
        if [ "$file" == "node_modules" ]; then
            if [ -d "$CORE_PATH/$file" ]; then
                mkdir -p "$temp_dir"

                log "Preserving node_modules directory..."
                cp --recursive --preserve=all -- "$CORE_PATH/$file" "$temp_dir"
                PRESERVED_CORE_NODE_MODULES=1
                continue
            else
                err "No node_modules directory found"
            fi
        fi

        for allowed in "${INCLUDED_CORE_FILES[@]}"; do
            [ "$file" == "$allowed" ] && { keep=1; break; }
        done

        if (( ! keep )); then
            log "Removing $CORE_PATH/$file..."
            # ! DANGER ZONE !
            # ! It is too dangerous here, I ain't gonna lie
            # ! we need to use `:?` to prevent being evaluated to '/'
            rm --recursive --force $VERBOSE_STR \
                -- "${CORE_PATH:?Core path is missing}/${file:?File name is missing}"

            # Set modified flag when first file is removed
            [ "$MODIFIED_CORE_PKG" -eq 0 ] && MODIFIED_CORE_PKG=1
        fi
    done < <(find "$CORE_PATH" -mindepth 1 -maxdepth 1 -printf '%f\0')

    # Remove unnecessary fields
    log "Removing unnecessary (${REMOVE_FIELDS[*]}) fields..."
    for field in "${REMOVE_FIELDS[@]}"; do
        # This will never fail even if the field doesn't exist
        bun pm --cwd "$CORE_PATH" pkg delete "$field" > "$LOG_FILE"
    done
    MODIFIED_CORE_PKG=1
}

post_prepare_core_pkg() {
    git_restore "$CORE_PATH" "$MODIFIED_CORE_PKG"
    MODIFIED_CORE_PKG=0

    git_stash_pop "$STASHED_CORE_PKG"
    STASHED_CORE_PKG=0

    # Remove license file
    remove_license "$CORE_PATH"

    # Restore the node_modules directory
    local temp_dir="$BUILD_TEMP_DIR/@bmi-calc.core"
    if (( PRESERVED_CORE_NODE_MODULES )); then
        log "Restoring node_modules directory..."
        cp --recursive --preserve=all -- "$temp_dir/node_modules" "$CORE_PATH"

        rm --recursive --force -- "$temp_dir"
        PRESERVED_CORE_NODE_MODULES=0
    fi
}

# --- Pack functions

pre_pack() {
    local path="$ROOT/apps/$TARGET"
    [ -d "$path" ] || { err "No target package found: apps/$TARGET"; exit 1; }

    # Run the package build
    log "Building @bmi-calc/$TARGET package..."
    bun run --filter "@bmi-calc/$TARGET" build > "$LOG_FILE"

    # Git stash the package.json if modified
    log "Stashing apps/$TARGET/package.json..."
    if ! git diff --quiet "$path/package.json"; then
        git stash push                                       \
            --keep-index                                     \
            --include-untracked                              \
            --message "prepack($TARGET): stash package.json" \
            $QUIET_STR                                       \
            -- "$path/package.json"

        STASHED_PKG=1
    else
        log "No changes in package.json"
    fi

    # Copy license file
    copy_license "$path"

    # Remove unnecessary fields
    log "Removing unnecessary (${REMOVE_FIELDS[*]}) fields..."
    for field in "${REMOVE_FIELDS[@]}"; do
        # This will never fail even if the field doesn't exist
        bun pm --cwd "apps/$TARGET" pkg delete "$field" > "$LOG_FILE"
    done
    MODIFIED_PKG=1
}

pack() {
    local path="$ROOT/apps/$TARGET"
    local filename="bmi-calc@${VERSION}.tgz"
    if [ -n "$FILENAME" ]; then
        filename="$FILENAME"
    fi

    pre_pack

    # This will trigger `build` script again, but don't worry
    # because it was cached
    log "Packing @bmi-calc/$TARGET package..."
    bun pm --cwd "apps/$TARGET" pack --filename "$filename" > "$LOG_FILE"
}

post_pack() {
    local path="$ROOT/apps/$TARGET"

    # Remove copied license file
    remove_license "$path"

    # Restore the package.json
    git_restore "$path/package.json" "$MODIFIED_PKG"
    MODIFIED_PKG=0

    # Pop the stash if it was stashed
    git_stash_pop "$STASHED_PKG"
    STASHED_PKG=0
}

# --- Clean up

cleanup() {
    local path="$ROOT/apps/$TARGET"
    log "Cleaning up..."

    post_prepare_core_pkg || true
    post_pack || true

    log "Done!"
}

# --- Main ---

# Trap signals to ensure cleanup
trap cleanup EXIT INT TERM HUP

# Parse arguments
parse_args "$@"

# Setup the core package
if prepare_core_pkg; then
    # Run the pack function
    pack
fi
