# Test snapshots

- `integration.test.ts.snap`

```
export const snapshot = {};

snapshot[`page title 1`] = `"bkosm - fresh blog"`;

snapshot[`page title 2`] = `"Test page used for automated testing - bkosm"`;

snapshot[`post url 1`] = `"http://localhost:8000/posts/test"`;

snapshot[`redirect url 1`] = `"http://localhost:8000/"`;
```

- `common.test.ts.snap`

```
export const snapshot = {};

snapshot[`test posts 1`] = `
{
  another: {
    creationDate: 2078-08-13T12:25:07.168Z,
    lastUpdate: 2078-08-13T15:12:09.307Z,
    title: "Another woah",
    visible: false,
  },
  misconfigured: {
    creationDate: 2079-08-13T12:25:07.168Z,
    lastUpdate: 2079-08-13T15:12:09.307Z,
  },
  test: {
    creationDate: 2077-08-13T12:25:07.168Z,
    lastUpdate: 2077-08-13T15:12:09.307Z,
    title: "Woah",
    visible: true,
  },
  third: {
    creationDate: 2079-08-13T12:25:07.168Z,
    lastUpdate: 2079-08-13T15:12:09.307Z,
    title: "Woah woah woah",
    visible: true,
  },
}
`;

snapshot[`prepared posts 1`] = `
[
  {
    id: "third",
    index: 0,
    meta: {
      creationDate: 2079-08-13T12:25:07.168Z,
      lastUpdate: 2079-08-13T15:12:09.307Z,
      title: "Woah woah woah",
      visible: true,
    },
  },
  {
    id: "test",
    index: 1,
    meta: {
      creationDate: 2077-08-13T12:25:07.168Z,
      lastUpdate: 2077-08-13T15:12:09.307Z,
      title: "Woah",
      visible: true,
    },
  },
]
`;

snapshot[`missing post result 1`] = `
{
  response: Response {
  body: ReadableStream { locked: false },
  bodyUsed: false,
  headers: Headers { "content-type": "text/plain;charset=UTF-8", location: "/" },
  ok: false,
  redirected: false,
  status: 307,
  statusText: "",
  url: ""
},
  type: "not-found",
}
`;

snapshot[`loaded post result 1`] = `
{
  sanitizedMarkup: '<h1><a href="#hello-world" rel="noopener noreferrer"></a>Hello world!</h1>',
  stats: {
    bytes: 15,
    creationDate: 2077-08-13T12:25:07.168Z,
    lastUpdate: 2077-08-13T15:12:09.307Z,
    name: "test",
    title: "Woah",
  },
  type: "success",
}
`;
```

- `approved.posts2.png`

![](/test/__snapshots__/approved.posts2.png)

- `approved.posts1.png`

![](/test/__snapshots__/approved.posts1.png)

- `approved.index1.png`

![](/test/__snapshots__/approved.index1.png)
