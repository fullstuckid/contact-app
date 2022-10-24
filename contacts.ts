import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import validator from "validator";

const path = "./data";

if (!existsSync(path)) {
  mkdirSync(path);
}

const file = "./data/contacts.json";

if (!existsSync(file)) {
  writeFileSync(file, "[]", "utf-8");
}

const loadContact = () => {
  const files = readFileSync(file, "utf-8");
  const contacts = JSON.parse(files);
  return contacts;
};

const saveContact = (nama: any, email: any, noHP: any) => {
  const contact = {
    nama,
    email,
    noHP,
  };

  const contacts = loadContact();

  const duplikat = contacts.find(
    (kontak: { nama: any }) => kontak.nama === nama
  );

  if (duplikat) {
    console.error("Kontak sudah terdaftar, gunakan nama lain");
    return false;
  }

  if (email) {
    if (!validator.isEmail(email)) {
      console.error("Format email yang anda gunakan tidak valid");
      return false;
    }
  }

  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.error("Masukan nomor dengan benar");
    return false;
  }

  contacts.push(contact);

  writeFileSync(file, JSON.stringify(contacts));

  console.info("Terimakasih sudah memasukan data.");
};

const listContact = () => {
  console.log("Daftar kontak");
  const contacts = loadContact();

  contacts.forEach((contact: { nama: any; noHP: any }, i: number) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = (nama: any) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (kontak: { nama: string }) =>
      kontak.nama.toLowerCase() === nama.toLowerCase()
  );

  if (contact) {
    console.log(contact.nama);
    if (contact.email) {
      console.log(contact.email);
    }
    console.log(contact.noHP);
  } else {
    console.error("Ups kontak yang anda cari tidak ada");
    return false;
  }
};

const deleteContact = (nama: any) => {
  const contacts = loadContact();

  const newContact = contacts.filter(
    (contact: { nama: string }) =>
      contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.legth === newContact.length) {
    console.error("Kontak yang ingin anda hapus tidak ada");
    return false;
  }

  writeFileSync(file, JSON.stringify(newContact));
  console.log("Kontak sudah terhapus");
};

export { saveContact, listContact, detailContact, deleteContact };
