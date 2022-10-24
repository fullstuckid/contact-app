"use strict";
exports.__esModule = true;
var yargs_1 = require("yargs");
var helpers_1 = require("yargs/helpers");
var contacts_js_1 = require("./contacts.js");
(0, yargs_1["default"])((0, helpers_1.hideBin)(process.argv))
    .command({
    command: "add",
    describe: "Menambahkan kontak baru",
    builder: {
        nama: {
            describe: "Nama",
            demandOption: true,
            type: "string"
        },
        email: {
            describe: "Email",
            demandOption: false,
            type: "string"
        },
        noHP: {
            describe: "No HP",
            demandOption: true,
            type: "string"
        }
    },
    handler: function (argv) {
        (0, contacts_js_1.saveContact)(argv.nama, argv.email, argv.noHP);
    }
})
    .command({
    command: "list",
    describe: "Menampilkan semua isi kontak",
    handler: function () {
        (0, contacts_js_1.listContact)();
    }
})
    .command({
    command: "detail",
    describe: "Menampilkan detail kontak berdasarkan nama",
    builder: {
        nama: {
            describe: "Nama",
            demandOption: true,
            type: "string"
        }
    },
    handler: function (argv) {
        (0, contacts_js_1.detailContact)(argv.nama);
    }
})
    .command({
    command: "delete",
    describe: "Menghapus kontak berdasarkan nama",
    builder: {
        nama: {
            describe: "Nama",
            demandOption: true,
            type: "string"
        }
    },
    handler: function (argv) {
        (0, contacts_js_1.deleteContact)(argv.nama);
    }
})
    .demandCommand()
    .parse();
