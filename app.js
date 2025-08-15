import './card.js';
import './spinner.js';
import { $, getJson, tags } from './utils.js';
import crypto from 'https://unpkg.com/crypto-esm@0.0.5/dist/crypto-esm.mjs';
const { AES } = crypto;
const [card, option, span, div, spinner] = tags('qr-card', 'option', 'span', 'div', 'qr-spinner');

let p1 = sessionStorage.getItem('p1');
if (!p1) {
    p1 = prompt('code');
    sessionStorage.setItem('p1', p1);
}

const pass = p1.substr(2);
const url = 'https://kvdb.io/MNUDuMSNBp9ab5f9mbQKTT/' + p1.substr(0, 2);
const decrypt = (text) => AES.decrypt(text, pass).toString(crypto.enc.Utf8);

fetch(url)
    .then((a) => a.text())
    .then((t) => {
        const list = JSON.parse(decrypt(t));
        const selectable = list.filter((a) => a.scrape && !a.profile);
        $('select').append(...selectable.map((x) => option({ value: encodeURIComponent(x.qr) }, x.text)));
    });

let urls = [];
$('select').addEventListener('change', (evt) => {
    $('main').replaceChildren(div({ class: 'spinner-container' }, spinner()));
    getJson('https://wratfxtipxqpqtqynfex.supabase.co/functions/v1/qr/scrape?url=' + evt.target.value).then((resp) => {
        urls = resp.map((a) => a.url);
        $('main').replaceChildren(
            ...resp.map((r) =>
                card(
                    {
                        imgUrl: r.profileImgUrl,
                        title: r.location,
                        description: r.dateStr,
						color: /^\d{1,2}:\d{2}\s*$/.test(r.dateStr) ? 'black' : 'grey',
                    },
                    span(r.isSafe ? '✅' : ''),
                ),
            ),
        );
    }).catch(e => {
		$('main').replaceChildren(div()); // remove spinner
		window.alert('error');
	});
});

$('main').addEventListener('click', (evt) => {
    const idx = $('main qr-card').findIndex((i) => i === evt.target);
    window.open(urls[idx], '_blank').focus();
});



