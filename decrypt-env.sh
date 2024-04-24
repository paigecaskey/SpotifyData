#!/bin/bash

# Decrypt .env.enc file to .env
openssl enc -aes-256-cbc -d -base64 -in .env.enc -out .env -pass pass:paige

