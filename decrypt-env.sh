#!/bin/bash

# Decrypt .env.enc file
#!/bin/bash

# Decrypt .env.enc to .env
openssl aes-256-cbc -d -in .env.enc -out .env -k $paige
