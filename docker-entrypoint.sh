#!/bin/bash
set -euo pipefail

MAX_RETRIES=30

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"; }

wait_for_db() {
    local retries=0
    log "Waiting for database connection..."
    until php artisan db:monitor --databases=mysql 2>/dev/null | grep -q "OK"; do
        retries=$((retries + 1))
        if [ $retries -ge $MAX_RETRIES ]; then
            log "ERROR: Database connection failed after $MAX_RETRIES attempts"
            exit 1
        fi
        log "Attempt $retries/$MAX_RETRIES - Database not ready, retrying..."
        sleep 2
    done
    log "Database connection established"
}

setup_application() {
    if ! grep -q "^APP_KEY=base64:" .env 2>/dev/null; then
        log "Generating application key..."
        php artisan key:generate --no-interaction
    fi

    if ! php artisan migrate:status 2>/dev/null | grep -q "Ran"; then
        log "First run detected - Running fresh migrations with seed..."
        php artisan migrate:fresh --seed --no-interaction --force
    else
        log "Running pending migrations..."
        php artisan migrate --no-interaction --force
    fi

    log "Clearing application cache..."
    php artisan config:clear
    php artisan route:clear
    php artisan view:clear
}

main() {
    log "Starting application initialization..."
    wait_for_db
    setup_application
    log "Application ready - Starting PHP-FPM"
    exec php-fpm
}

main "$@"


