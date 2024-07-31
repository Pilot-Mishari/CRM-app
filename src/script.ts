import { Ident } from './classes/database.interface.js';

const ident: Ident[] = require('./database.json');

const sortedIdent = ident.sort((a, b) => {
    const priorityOrder = ['HIGH', 'MEDIUM', 'LOW', 'N/A'];
    return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
});