import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  saveContact,
  listContact,
  detailContact,
  deleteContact,
} from "./contacts.js";

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Menambahkan kontak baru",
    builder: {
      nama: {
        describe: "Nama",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "No HP",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      saveContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .command({
    command: "list",
    describe: "Menampilkan semua isi kontak",
    handler() {
      listContact();
    },
  })
  .command({
    command: "detail",
    describe: "Menampilkan detail kontak berdasarkan nama",
    builder: {
      nama: {
        describe: "Nama",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      detailContact(argv.nama);
    },
  })
  .command({
    command: "delete",
    describe: "Menghapus kontak berdasarkan nama",
    builder: {
      nama: {
        describe: "Nama",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      deleteContact(argv.nama);
    },
  })
  .demandCommand()
  .parse();
