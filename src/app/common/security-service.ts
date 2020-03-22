import { Injectable, TemplateRef } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class CryptoService {
    public key = '714669A4A88B9F36BCBD92F62F3B';

    encryptUsingAES256(data: any) {
        const _key = CryptoJS.enc.Utf8.parse(this.key);
        const _iv = CryptoJS.enc.Utf8.parse(this.key);
        const encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(data), _key, {
            keySize: 16,
            iv: _iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }

    decryptUsingAES256(data: any) {
        const _key = CryptoJS.enc.Utf8.parse(this.key);
        const _iv = CryptoJS.enc.Utf8.parse(this.key);
        return JSON.parse(
            CryptoJS.AES.decrypt(
                data, _key, {
                keySize: 16,
                iv: _iv,
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }).toString(CryptoJS.enc.Utf8)
        );
    }
}
