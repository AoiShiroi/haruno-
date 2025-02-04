let fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, args, command }) => {
    if(!args[0]) throw `Uhm... URL nya mana?\n\nMasukkan link tiktok yang valid.\nContoh: ${usedPrefix + command} https://vt.tiktok.com/ZSwWCk5o/`
    let res = await fetch(global.API('lolhum', '/api/tiktok', { url: args[0]}, 'apikey'))
    if (!res.ok) throw await res.text()
    let json = await res.json()
    let nrm = `
Title: *${json.result.title}*
Keywords: ${json.result.keywords}
Description: ${json.result.description}

${watermark}
`.trim()
    await conn.sendFile(m.chat, json.result.link, 'video.mp4', nrm, m)
    await conn.sendFile(m.chat, json.result.audio, 'audio.mp3', 0, m)
}
handler.command = /^tiktok$/i
handler.tags = ['downloader']
handler.help = ['tiktok <url>']
module.exports = handler