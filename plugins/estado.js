let handler = async (m, { conn, command, usedPrefix }) => {
let picture = './Menu2.jpg'
let estado =`
*ใ๐ Hola estimado usuario ๐ๅฝก*

*ใ๐ค Estado del Bot ๐คๅฝก*
*=> Bot activo โ๏ธ*
*=> Bot uso pรบblico โ๏ธ*
`.trim()

conn.sendHydrated(m.chat, estado, '๐งฟ ๐๐๐ ๐ผ๐ข๐๐๐๐ - ๐ฑ๐๐ ๐ฎ', picture, 'https://chat.whatsapp.com/E9qJfvlLjENKAxnhII9rao', 'GRUPO', null, null, [
['MENร PRINCIPAL', '/menu'],
['MENร SIMPLE', '/menusimple'],
['MENร AUDIOS', '/menu2']
], m)}

handler.command = /^(estado|status|estate|state|stado|stats)$/i
export default handler
