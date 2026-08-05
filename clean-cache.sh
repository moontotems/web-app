#!/bin/bash

# ANSI color codes
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color
BOLD='\033[1m'

print_header() {
    echo -e "\n${BLUE}${BOLD}$1${NC}\n${BLUE}${BOLD}$(printf '=%.0s' {1..50})${NC}\n"
}

print_success() {
    echo -e "${GREEN}✔ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✘ $1${NC}"
}

print_header "Starting node_modules Cleanup Process"

# Initialize counters
deleted_count=0
failed_count=0

# Use a while loop to process directories
find . -name "node_modules" -type d -prune | while read -r dir; do
    echo -e "\n${BOLD}Processing: ${NC}$dir"
    if rm -rf "$dir"; then
        print_success "Deleted: $dir"
        ((deleted_count++))
    else
        print_error "Failed to delete: $dir"
        ((failed_count++))
    fi
done

print_header "Cleanup Summary"
echo -e "${BOLD}Directories processed: ${NC}$((deleted_count + failed_count))"
print_success "Directories deleted: $deleted_count"
if [ $failed_count -gt 0 ]; then
    print_error "Directories failed to delete: $failed_count"
fi

print_header "Node Modules Cleanup Process Complete"