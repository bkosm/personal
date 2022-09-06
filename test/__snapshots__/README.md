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
  },
  test: {
    creationDate: 2077-08-13T12:25:07.168Z,
    lastUpdate: 2077-08-13T15:12:09.307Z,
    title: "Woah",
  },
}
`;
```

- `approved.posts2.png`

![](/test/__snapshots__/approved.posts2.png)

- `approved.posts1.png`

![](/test/__snapshots__/approved.posts1.png)

- `approved.index1.png`

![](/test/__snapshots__/approved.index1.png)
