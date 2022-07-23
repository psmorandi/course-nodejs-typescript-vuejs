drop table nodejs.card;
drop table nodejs.column;
drop table nodejs.board;

create table nodejs.board (
    id_board serial primary key,
    name text,
    description text,
    columns_order text
);

create table nodejs.column (
    id_column serial primary key,
    id_board integer references nodejs.board (id_board),
    name text,
    has_estimative boolean,
    cards_order text
);

create table nodejs.card (
    id_card serial primary key,
    id_column INTEGER REFERENCES nodejs.column (id_column),
    title text,
    estimative integer
);

insert into nodejs.board (name, description) values ('Projeto 1', 'Meu projeto 1');
insert into nodejs.column (id_column, id_board, name, has_estimative) values (1, 1, 'Coluna A', true);
insert into nodejs.column (id_column, id_board, name, has_estimative) values (2, 1, 'Coluna B', true);
insert into nodejs.column (id_column, id_board, name, has_estimative) values (3, 1, 'Coluna C', true);
insert into nodejs.card (id_card, id_column, title, estimative) values (1, 1, 'Atividade 1', 3);
insert into nodejs.card (id_card, id_column, title, estimative) values (2, 1, 'Atividade 2', 2);
insert into nodejs.card (id_card, id_column, title, estimative) values (3, 1, 'Atividade 3', 1);