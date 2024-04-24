#!/bin/bash

# Decrypt .env.enc file to .env
openssl enc -aes-256-cbc -d -in .env.enc -out .env -k paige

