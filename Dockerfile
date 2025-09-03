FROM postgres:latest

# Expose the default PostgreSQL port
EXPOSE 5432

# Default command to run PostgreSQL
CMD ["postgres"]
