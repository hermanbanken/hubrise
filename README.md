# HubRise
Using GitHub as mobile application build system suffers from a few discrepancies
between available specialized CI/CD providers and GitHub Actions. The main one is
there is no landing page for builds (iOS requires manifest.plist format).

This GitHub Action tries to solve this by taking a collection of ipa and apk files
and hosting them in S3 with a very lightweight HTML page.
