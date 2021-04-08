CREATE (c1:Atom:Carbon {element: 'C', limit: 4})
CREATE (c2:Atom:Carbon {element: 'C', limit: 4})

CREATE (h1_1:Atom:Hydrogen {element: 'H', limit: 1})
CREATE (h1_2:Atom:Hydrogen {element: 'H', limit: 1})
CREATE (h1_3:Atom:Hydrogen {element: 'H', limit: 1})
CREATE (h2_1:Atom:Hydrogen {element: 'H', limit: 1})
CREATE (h2_2:Atom:Hydrogen {element: 'H', limit: 1})
CREATE (h2_3:Atom:Hydrogen {element: 'H', limit: 1})

CREATE (c1)-[bc1c2:Bond]->(c2)

CREATE (c1)-[bc1h1:Bond]->(h1_1)
CREATE (c1)-[bc1h2:Bond]->(h1_2)
CREATE (c1)-[bc1h3:Bond]->(h1_3)
CREATE (c2)-[bc2h1:Bond]->(h2_1)
CREATE (c2)-[bc2h2:Bond]->(h2_2)
CREATE (c2)-[bc2h3:Bond]->(h2_3)