drop table nodejs.card;
drop table nodejs.column;
drop table nodejs.board;

create table nodejs.board (
    id_board serial primary key,
    name text,
    description text
);

create table nodejs.column (
    id_column serial primary key,
    id_board integer references nodejs.board (id_board),
    name text,
    has_estimative boolean
);

create table nodejs.card (
    id_card serial primary key,
    id_column INTEGER REFERENCES nodejs.column (id_column),
    title text,
    estimative integer
);