# projeto20-repoProvas

Project developed using TypeScript for tests management

<p align="center">
  <img  src="https://desenrolaa.com.br/wp-content/uploads/2017/11/homework.png">
</p>
<h1 align="center">
  RepoProvas
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white" height="30px"/>
  
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Links

[Front-end Repository](https://github.com/ThVinicius/repoProvas_frontEnd)

[Deploy Front-end](http://repo-provas-front-end-lake.vercel.app/)

[Deploy Back-end](https://th-repoprovas.herokuapp.com/)

</br>

# Description

RepoProvas is a system for sharing tests between students. In RepoProvas, anyone can search for old tests of their disciplines and teachers or send old tests

</br>

## Features

- Create accounts and access them
- List the tests grouped by disciplines
- List tests grouped by teachers
- Register tests

</br>

## API Reference

### Authentication routes

#### Create an account

```http
POST /signup
```

<h3>Request:</h3>

| Params            | Type     | Description                                       |
| :---------------- | :------- | :------------------------------------------------ |
| `email`           | `string` | **Required**, **email format**                    |
| `password`        | `string` | **Required**, **size equal to or greater than 3** |
| `confirmPassword` | `string` | **Required**, **same as password**                |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                              |
| :---------- | :------------------------------------------------- |
| `400`       | _Request in wrong format_                          |
| `409`       | _try to register with an email already registered_ |

<h3>Success case (status code <span style="color:green">201</span>)</h3>

#

### Access to an account

```http
POST /signin
```

<h3>Request:</h3>

| Params     | Type     | Description                                       |
| :--------- | :------- | :------------------------------------------------ |
| `email`    | `string` | **Required**, **email format**                    |
| `password` | `string` | **Required**, **size equal to or greater than 3** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                       |
| :---------- | :------------------------------------------ |
| `400`       | _Email and/or password in incorrect format_ |
| `401`       | _Incorrect email and/or password_           |

<h3>Success case (status code <span style="color:green">200:</span>)</h3>

```jsx
token: // json web token
```

#

### Tests routes

#### Send test

```http
POST /tests
```

<h3>Request:</h3>
<h4>Send via a multipart/form-data form</h4>

| Params                | Type              | Description                                   |
| :-------------------- | :---------------- | :-------------------------------------------- |
| `name`                | `string`          | **required**, **trim**                        |
| `file`                | `application/pdf` | **required**                                  |
| `categoryId`          | `number`          | **required**, **greater than 0**, **integer** |
| `teacherDisciplineId` | `number`          | **required**, **greater than 0**, **integer** |

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                                                    |
| :---------- | :------------------------------------------------------- |
| `400`       | _Request in wrong format_                                |
| `401`       | _Invalid token_                                          |
| `404`       | _disciplineId and/or teacherDisciplineId does not exist_ |
| `426`       | _Outdated token_                                         |
| `498`       | _Expired token_                                          |

<h3>Success case (status code <span style="color:green">201:</span>)</h3>

```json
{
  "id": 14,
  "name": "2022 - globo.com",
  "pdfUrl": "https://tpkkzyvybeoysawyhkyc.supabase.co/storage/v1/object/public/pdf-tests/test.pdf",
  "categoryId": 1,
  "teacherDisciplineId": 1,
  "createdAt": "2022-09-18T13:49:07.612Z"
}
```

#

#### Search for tests grouped into disciplines

```http
GET /tests/disciplines
```

<h3>Request:</h3>

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                     |
| :---------- | :------------------------ |
| `400`       | _Request in wrong format_ |
| `401`       | _Invalid token_           |
| `426`       | _Outdated token_          |
| `498`       | _Expired token_           |

<h3>Success case (status code <span style="color:green">200:</span>)</h3>

```json
[
  {
    "termId": 1,
    "number": 1,
    "disciplines": [
      {
        "disciplineId": 4,
        "discipline": "Humildade",
        "categories": []
      },
      {
        "disciplineId": 1,
        "discipline": "HTML e CSS",
        "categories": [
          {
            "categoryId": 1,
            "category": "Projeto",
            "tests": [
              {
                "testId": 10,
                "test": "2022 - teste1",
                "pdfUrl": "https://google.com",
                "teacherId": 1,
                "teacher": "Diego Pinho"
              },
              {
                "testId": 14,
                "test": "2022 - globo.com",
                "pdfUrl": "https://google.com",
                "teacherId": 1,
                "teacher": "Diego Pinho"
              },
              {
                "testId": 1,
                "test": "prova muito dificil",
                "pdfUrl": "https://google.com",
                "teacherId": 1,
                "teacher": "Diego Pinho"
              }
            ]
          },
          {
            "categoryId": 2,
            "category": "Prática",
            "tests": [
              {
                "testId": 2,
                "test": "prova muito facil",
                "pdfUrl": "https://google.com",
                "teacherId": 1,
                "teacher": "Diego Pinho"
              },
              {
                "testId": 3,
                "test": "prova muito media",
                "pdfUrl": "https://google.com",
                "teacherId": 1,
                "teacher": "Diego Pinho"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "termId": 2,
    "number": 2,
    "disciplines": [
      {
        "disciplineId": 2,
        "discipline": "JavaScript",
        "categories": [
          {
            "categoryId": 2,
            "category": "Prática",
            "tests": [
              {
                "testId": 11,
                "test": "2022 - teste2",
                "pdfUrl": "https://google.com",
                "teacherId": 1,
                "teacher": "Diego Pinho"
              }
            ]
          }
        ]
      },
      {
        "disciplineId": 5,
        "discipline": "Planejamento",
        "categories": [
          {
            "categoryId": 2,
            "category": "Prática",
            "tests": [
              {
                "testId": 8,
                "test": "teste",
                "pdfUrl": "https://google.com",
                "teacherId": 2,
                "teacher": "Bruna Hamori"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "termId": 3,
    "number": 3,
    "disciplines": [
      {
        "disciplineId": 3,
        "discipline": "React",
        "categories": [
          {
            "categoryId": 1,
            "category": "Projeto",
            "tests": [
              {
                "testId": 9,
                "test": "2022 - TrackIt",
                "pdfUrl": "https://google.com",
                "teacherId": 1,
                "teacher": "Diego Pinho"
              }
            ]
          },
          {
            "categoryId": 3,
            "category": "Recuperação",
            "tests": [
              {
                "testId": 12,
                "test": "2022 - teste3",
                "pdfUrl": "https://google.com",
                "teacherId": 1,
                "teacher": "Diego Pinho"
              }
            ]
          }
        ]
      },
      {
        "disciplineId": 6,
        "discipline": "Autoconfiança",
        "categories": []
      }
    ]
  },
  {
    "termId": 4,
    "number": 4,
    "disciplines": []
  },
  {
    "termId": 5,
    "number": 5,
    "disciplines": []
  },
  {
    "termId": 6,
    "number": 6,
    "disciplines": []
  }
]
```

#

#### Search for tests grouped into teachers

```http
GET /tests/teachers
```

<h3>Request:</h3>

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                     |
| :---------- | :------------------------ |
| `400`       | _Request in wrong format_ |
| `401`       | _Invalid token_           |
| `426`       | _Outdated token_          |
| `498`       | _Expired token_           |

<h3>Success case (status code <span style="color:green">200:</span>)</h3>

```json
[
  {
    "teacherId": 1,
    "teacher": "Diego Pinho",
    "categories": [
      {
        "categoryId": 1,
        "category": "Projeto",
        "tests": [
          {
            "testId": 1,
            "test": "prova muito dificil",
            "pdfUrl": "https://google.com",
            "discipline": "HTML e CSS"
          },
          {
            "testId": 9,
            "test": "2022 - TrackIt",
            "pdfUrl": "https://google.com",
            "discipline": "React"
          },
          {
            "testId": 10,
            "test": "2022 - teste1",
            "pdfUrl": "https://google.com",
            "discipline": "HTML e CSS"
          },
          {
            "testId": 14,
            "test": "2022 - globo.com",
            "pdfUrl": "https://google.com",
            "discipline": "HTML e CSS"
          }
        ]
      },
      {
        "categoryId": 2,
        "category": "Prática",
        "tests": [
          {
            "testId": 2,
            "test": "prova muito facil",
            "pdfUrl": "https://google.com",
            "discipline": "HTML e CSS"
          },
          {
            "testId": 3,
            "test": "prova muito media",
            "pdfUrl": "https://google.com",
            "discipline": "HTML e CSS"
          },
          {
            "testId": 11,
            "test": "2022 - teste2",
            "pdfUrl": "https://google.com",
            "discipline": "JavaScript"
          }
        ]
      },
      {
        "categoryId": 3,
        "category": "Recuperação",
        "tests": [
          {
            "testId": 12,
            "test": "2022 - teste3",
            "pdfUrl": "https://google.com",
            "discipline": "React"
          }
        ]
      }
    ]
  },
  {
    "teacherId": 2,
    "teacher": "Bruna Hamori",
    "categories": [
      {
        "categoryId": 2,
        "category": "Prática",
        "tests": [
          {
            "testId": 8,
            "test": "teste",
            "pdfUrl": "https://google.com",
            "discipline": "Planejamento"
          }
        ]
      }
    ]
  }
]
```

#

#### Seek the relationship between disciplines and teachers

```http
GET /teachersdisciplines
```

<h3>Request:</h3>

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                     |
| :---------- | :------------------------ |
| `400`       | _Request in wrong format_ |
| `401`       | _Invalid token_           |
| `426`       | _Outdated token_          |
| `498`       | _Expired token_           |

<h3>Success case (status code <span style="color:green">200:</span>)</h3>

```json
[
  {
    "disciplineId": 1,
    "discipline": "HTML e CSS",
    "teachers": [
      {
        "teacherDisciplineId": 1,
        "teacherId": 1,
        "teacher": "Diego Pinho"
      }
    ]
  },
  {
    "disciplineId": 2,
    "discipline": "JavaScript",
    "teachers": [
      {
        "teacherDisciplineId": 2,
        "teacherId": 1,
        "teacher": "Diego Pinho"
      }
    ]
  },
  {
    "disciplineId": 3,
    "discipline": "React",
    "teachers": [
      {
        "teacherDisciplineId": 3,
        "teacherId": 1,
        "teacher": "Diego Pinho"
      }
    ]
  },
  {
    "disciplineId": 4,
    "discipline": "Humildade",
    "teachers": [
      {
        "teacherDisciplineId": 4,
        "teacherId": 2,
        "teacher": "Bruna Hamori"
      }
    ]
  },
  {
    "disciplineId": 5,
    "discipline": "Planejamento",
    "teachers": [
      {
        "teacherDisciplineId": 5,
        "teacherId": 2,
        "teacher": "Bruna Hamori"
      }
    ]
  },
  {
    "disciplineId": 6,
    "discipline": "Autoconfiança",
    "teachers": [
      {
        "teacherDisciplineId": 6,
        "teacherId": 2,
        "teacher": "Bruna Hamori"
      }
    ]
  }
]
```

#

#### Search for registered disciplines

```http
GET /categories
```

<h3>Request:</h3>

<h4>Headers:</h4>
Send the token (Bearer token)

| Params          | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `string` | **required**, **Starting with Bearer** |

<h3>Response:</h3>

<h3>Error cases:</h3>

| Status code | Cause                     |
| :---------- | :------------------------ |
| `400`       | _Request in wrong format_ |
| `401`       | _Invalid token_           |
| `426`       | _Outdated token_          |
| `498`       | _Expired token_           |

<h3>Success case (status code <span style="color:green">200:</span>)</h3>

```json
[
  {
    "id": 1,
    "name": "Projeto",
    "createdAt": "2022-09-13T16:32:59.540Z"
  },
  {
    "id": 2,
    "name": "Prática",
    "createdAt": "2022-09-13T16:32:59.540Z"
  },
  {
    "id": 3,
    "name": "Recuperação",
    "createdAt": "2022-09-13T16:32:59.540Z"
  }
]
```

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:5000`

`JWT_SECRET = any string`

`SUPABASE_URL = Project URL from supabase`

`SUPABASE_KEY = service_role from supabase`

[Supabase](https://supabase.com/)

[guide to create a buckets in Supabase](https://supabase.com/docs/guides/storage)

</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/ThVinicius/repoProvas_backEnd.git
```

Go to the project directory

```bash
  cd repoProvas_backEnd
```

Install dependencies

```bash
  npm install
```

Create database

```bash
  npx prisma migrate dev
```

Create seed

```bash
  npm run seed
```

Start the server

```bash
  npm run start
```

</br>

## Acknowledgements

- [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

</br>

## Authors

- Vinicius Pacheco is a student at Driven Education and is putting effort into it to switch careers. Nowadays he works with Engineering,
  looking forward to become a Dev.
  <br/>

#
