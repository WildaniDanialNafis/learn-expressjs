import { mhs } from "../src";

test('Objek Test', () => {
    const mahasiswa = mhs();
    expect(mahasiswa).toEqual({
        id: 2,
        nama: 'Lalala'
    });
})

test('Item Test', () => {
    const mahasiswa = mhs();
    expect(mahasiswa.nama).toBe('Lalala');
})