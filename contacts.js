"use strict";
exports.__esModule = true;
exports.deleteContact = exports.detailContact = exports.listContact = exports.saveContact = void 0;
var fs_1 = require("fs");
var validator_1 = require("validator");
var path = "./data";
if (!(0, fs_1.existsSync)(path)) {
    (0, fs_1.mkdirSync)(path);
}
var file = "./data/contacts.json";
if (!(0, fs_1.existsSync)(file)) {
    (0, fs_1.writeFileSync)(file, "[]", "utf-8");
}
var loadContact = function () {
    var files = (0, fs_1.readFileSync)(file, "utf-8");
    var contacts = JSON.parse(files);
    return contacts;
};
var saveContact = function (nama, email, noHP) {
    var contact = {
        nama: nama,
        email: email,
        noHP: noHP
    };
    var contacts = loadContact();
    var duplikat = contacts.find(function (kontak) { return kontak.nama === nama; });
    if (duplikat) {
        console.error("Kontak sudah terdaftar, gunakan nama lain");
        return false;
    }
    if (email) {
        if (!validator_1["default"].isEmail(email)) {
            console.error("Format email yang anda gunakan tidak valid");
            return false;
        }
    }
    if (!validator_1["default"].isMobilePhone(noHP, "id-ID")) {
        console.error("Masukan nomor dengan benar");
        return false;
    }
    contacts.push(contact);
    (0, fs_1.writeFileSync)(file, JSON.stringify(contacts));
    console.info("Terimakasih sudah memasukan data.");
};
exports.saveContact = saveContact;
var listContact = function () {
    console.log("Daftar kontak");
    var contacts = loadContact();
    contacts.forEach(function (contact, i) {
        console.log("".concat(i + 1, ". ").concat(contact.nama, " - ").concat(contact.noHP));
    });
};
exports.listContact = listContact;
var detailContact = function (nama) {
    var contacts = loadContact();
    var contact = contacts.find(function (kontak) {
        return kontak.nama.toLowerCase() === nama.toLowerCase();
    });
    if (contact) {
        console.log(contact.nama);
        if (contact.email) {
            console.log(contact.email);
        }
        console.log(contact.noHP);
    }
    else {
        console.error("Ups kontak yang anda cari tidak ada");
        return false;
    }
};
exports.detailContact = detailContact;
var deleteContact = function (nama) {
    var contacts = loadContact();
    var newContact = contacts.filter(function (contact) {
        return contact.nama.toLowerCase() !== nama.toLowerCase();
    });
    if (contacts.legth === newContact.length) {
        console.error("Kontak yang ingin anda hapus tidak ada");
        return false;
    }
    (0, fs_1.writeFileSync)(file, JSON.stringify(newContact));
    console.log("Kontak sudah terhapus");
};
exports.deleteContact = deleteContact;
