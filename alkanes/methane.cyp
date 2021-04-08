CREATE (c:Atom:Carbon {element: 'C', limit: 4})

CREATE (h1:Atom:Hydrogen {element: 'H', limit: 1})
CREATE (h2:Atom:Hydrogen {element: 'H', limit: 1})
CREATE (h3:Atom:Hydrogen {element: 'H', limit: 1})
CREATE (h4:Atom:Hydrogen {element: 'H', limit: 1})

CREATE (c)-[b1:Bond]->(h1)
CREATE (c)-[b2:Bond]->(h2)
CREATE (c)-[b3:Bond]->(h3)
CREATE (c)-[b4:Bond]->(h4)