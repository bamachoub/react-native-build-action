# React Native Build Action

### Secrets Required

**SIGNING_KEY** is sha256 encoded of keystore file.
**STORE_PASSWORD** is keystore password
**KEY_PASSWORD** is upload key password

### Action Inputs

| name          | accepted values         | default    |
| :------------ | :---------------------- | :--------- |
| plartform     | `android`               | `android`  |
| type          | `bundle | assemble`     | `assemble` |
| keystore-name | key store file name     | `release`  |