#!/bin/bash

# Decrypt .env.enc file
gpg --decrypt --output .env .env.enc
