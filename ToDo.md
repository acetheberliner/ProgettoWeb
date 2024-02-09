## Cose da fare

# correggere
- Add Note (errore nella query di add)

# manca
- delete della nota (POST) [FATTO] (aggiornato ma la query delete commentata, prima va risolto il problema di idnote in post-notes.vue)
- edit della nota [FATTO]  (aggiunta, bisogna passare i paramentri idnote, newTitle, newCategory, newText)
- aggiungere pagina crea nota (e togliere da esplora) [FATTO]

- interfaccia user/mod [FATTO]
- problema login [RISOLTO]
- elimina solo se mod o creatore [FATTO]
- modifica solo se mod o creatore [FATTO]
- approvazione delle note in esplora
- aggiunto updateState (sottoforma di post, sia l'id della nota e che lo stato) [FATTO]

# prof
- Utente moderatore. [FATTO]
- Quando un utente aggiunge o modifica gli appunti, questi vengono messi in stato di attesa di approvazione. [FATTO/2]
- L'utente moderatore vede gli appunti in attesa di approvazione, può accettarli e questi vengono pubblicati. Se li rifiuta, può aggiungere un commento.
- L'utente può modificare gli appunti rifiutati e provare a ripubblicarli.