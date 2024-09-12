import pdf from 'pdf-creator-node';
import fs from 'fs';
import barangCollection from '../models/barangModel.js';
import { type } from 'os';

const showReport = (req, res, next) => {
    try {
        const data = {
            title: 'Report Barang',
            layout: 'layout/main',
            message: req.flash('message'),
            data: req.flash('data')[0] 
        }
        res.render('reportBarang/index', data);
    } catch (err) {
        next(new Error("controllers/reportBarangControler.js:showReport - " + err.message));
    }
}

const generatePdf = async (req, res, next) => {
    try {
        let pathFile = "./file-output";
        let fileName = "output.pdf";
        let fullPath = pathFile + "/" + fileName;
        let html = fs.readFileSync("./src/templates/template.html", "utf-8");
        let options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "5mm",
                contents: `
                    <div style="text-align: center;">
                        Author: Nacht
                    </div>
                `
            },
            footer: {
                height: "20mm",
                contents: {
                    first: `Cover page`,
                    2: `Second page`,
                    default: `
                        <span style="color: #444; font-size: 10px; text-align: right;">{{page}} of {{pages}}</span>
                    `,
                    last: `Last page`
                },
            },
        }
        const data = await barangCollection.find({});
        let barangs = [];
        data.forEach((barang, no) => {
            barangs.push({
                no: no + 1,
                id: barang._id,
                nama_barang: barang.nama_barang,
                jumlah: barang.jumlah.toLocaleString("id"),
                harga_satuan: barang.harga_satuan.toLocaleString("id"),
                expired_date: barang.expired_date? new Date(barang.expired_date).toISOString().slice(0, 10) : "",
            });
        });
        let document = {
            html: html,
            data: {
                barangs: barangs,
            },
            path: fullPath,
            type: ""
        };
        const process = await pdf.create(document, options);
        if (process) {
            res.download(fullPath, fileName, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(fullPath);
                }
            })
        }
    } catch (err) {
        next(new Error("controllers/reportBarangControler.js:generatePdf - " + err.message));
    }
}

export { showReport, generatePdf };