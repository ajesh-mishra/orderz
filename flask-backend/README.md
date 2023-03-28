## Interact with DataBase

- Activate your virtual environment

- Run commands in the context of your application

```bash
export FLASK_APP=app
flask shell
```

- Import the DB and necessary Models 

```bash
from app import db
from app.models import Catalog, Menu
```

- Create/ Drop all Tables

```bash
db.create_all()
db.drop_all()
```

- Add rows to Catalog Table

```python
from app.models import Catalog, Menu
item1 = Catalog(name='Chilly Chicken', is_veg=False, price=150)
item = Catalog(name='Chicken Pokada', is_veg=False, price=120)
```

- Commit the row

```bash
db.session.add(item)
db.session.commit()
```
- Query the table


```bash
Catalog.query.all()
Catalog.query.filter_by(firstname='Sammy').all()

Catalog.query.filter_by(id=1).first()
Student.query.get(3)
```