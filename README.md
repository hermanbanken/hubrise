# HubRise
Using GitHub as mobile application build system suffers from a few discrepancies
between available specialized CI/CD providers and GitHub Actions. The main one is
there is no landing page for builds (iOS requires manifest.plist format).

This GitHub Action tries to solve this by taking a collection of ipa and apk files
and hosting them in S3 with a very lightweight HTML page.

### Usage

<details><summary>
  For Android (with React Native file structure):

  ```yaml
     - name: Upload apk to S3
       id: s3
       if: ${{ steps.apk.outcome == 'success' }}
       uses: hermanbanken/hubrise@v0.0.6
       with:
         bucket: s3://your-bucket
         destinationPath: ${{ github.run_number }}-${{ steps.uuid.outputs.uuid }}
         sourcePaths: ${{ github.workspace }}/app/android/app/build/outputs/apk/**/*.apk
  ```
  
  </summary>

   ```yaml
      - name: Build
        id: apk
        working-directory: app/android
        run: ./build.sh
        env:
          ANDROID_SIGNING_STORE_FILE: ${{ github.workspace }}/keystore.jks
          ANDROID_SIGNING_STORE_PASSWORD: ${{ secrets.ANDROID_SIGNING_STORE_PASSWORD }}
          ANDROID_SIGNING_KEY_ALIAS: ${{ secrets.ANDROID_SIGNING_KEY_ALIAS }}
          ANDROID_SIGNING_KEY_PASSWORD: ${{ secrets.ANDROID_SIGNING_KEY_PASSWORD }}

      # Upload apk to S3
      - name: Configure AWS credentials from sandbox account
        uses: aws-actions/configure-aws-credentials@v1
        with:
          role-to-assume: ${{ secrets.AWS_ROLE }}
      - name: Get uuid
        id: uuid
        run: |
          echo "::set-output name=uuid::$(uuidgen)"
      - name: Upload apk to S3
        id: s3
        if: ${{ steps.apk.outcome == 'success' }}
        uses: hermanbanken/hubrise@v0.0.6
        with:
          bucket: s3://your-bucket
          destinationPath: ${{ github.run_number }}-${{ steps.uuid.outputs.uuid }}
          sourcePaths: ${{ github.workspace }}/app/android/app/build/outputs/apk/**/*.apk
      - name: Slack
        if: ${{ steps.apk.outcome == 'success' }}
        run: notify-slack.js
        working-directory: ${{ github.workspace }}
        env:
          SLACK_URL: ${{ secrets.SLACK_URL_ANDROID }}
          QR_DESTINATION: ${{ steps.s3.outputs.url }}
  ```

</details>

<details><summary>
  For iOS  (with React Native file structure):
  
  ```yaml
     - name: Upload ipa to S3
       id: s3
       if: ${{ steps.apk.outcome == 'success' }}
       uses: hermanbanken/hubrise@v0.0.6
       with:
         bucket: s3://your-bucket
         destinationPath: ${{ github.run_number }}-${{ steps.uuid.outputs.uuid }}
         sourcePaths: ${{ github.workspace }}/app/ios/**/*.ipa
  ```
  
  </summary>
  
  ```yaml
        # Build & optionally upload to Apple
      - id: ipa
        name: Build iOS binary
        run: build.sh
        env:
          ASC_KEY_ID: ${{ secrets.ASC_KEY_ID }}
          ASC_ISSUER_ID: ${{ secrets.ASC_ISSUER_ID }}
          ASC_KEY: ${{ secrets.ASC_PRIVATE_KEY }}
          MATCH_SSH_KEY: ${{ secrets.MATCH_SSH_KEY }}
          MATCH_PASSWORD: ${{ secrets.MATCH_PASSWORD }}

      # Upload ipa to S3
      - name: Configure AWS credentials from sandbox account
        uses: aws-actions/configure-aws-credentials@v1
        with:
          role-to-assume: ${{ secrets.AWS_ROLE }}
      - name: Get uuid
        id: uuid
        run: |
          echo "::set-output name=uuid::$(uuidgen)"
      - name: Upload ipa to S3
        id: s3
        if: ${{ steps.ipa.outcome == 'success' }}
        uses: hermanbanken/hubrise@v0.0.6
        with:
          bucket: s3://your-bucket
          destinationPath: ${{ github.run_number }}-${{ steps.uuid.outputs.uuid }}
          sourcePaths: ${{ github.workspace }}/app/ios/**/*.ipa
      - name: Slack
        if: ${{ steps.ipa.outcome == 'success' }}
        run: notify-slack.js
        working-directory: ${{ github.workspace }}
        env:
          SLACK_URL: ${{ secrets.SLACK_URL_IOS }}
          QR_DESTINATION: ${{ steps.s3.outputs.url }}
  ```
</details>
