# Routing

The project routing uses React Router. Although it uses the latest V7 version, it is recommended to read the V6 documentation - https://reactrouter.com/en/6.28.1/, both documents are quite poor.

## Router Directory

```bash
├── router
│   ├── constants.ts                      # Route whitelist
│   ├── extra-info                        # Route additional information
│   │   ├── index.ts
│   │   ├── route-path.ts                 # Route paths, used for route navigation, unified in one place for easy path modification
│   │   └── order.ts                      # Route menu order
│   ├── guards.tsx                        # Route guard
│   ├── router-global-hooks.ts            # Router global hooks
│   ├── routes
│   │   ├── core                          # Core routes
│   │   ├── modules                       # Dynamic routes
│   │   └── static                        # Static routes
│   ├── types.ts                          # Route type definitions
│   └── utils.ts                          # Route utility functions
```

## Router Components

Only commonly used components in the project are listed:

| Component Name | Function     | Description       |
|---------------|-------------|-------------------|
| `<Link>`      | Navigation component | Used for page navigation |
| `<Outlet/>`   | Render container component | Used to render nested routes. |

## Hooks

### useMatches

Returns all route objects matched by the current route

```ts
import { useMatches } from "react-router";

const matches = useMatches();
console.log(matches);
// Output: [{ pathname: '/path', params: {}, data: {} }, ...]
```

Based on `useMatches()`, the project encapsulates the `useCurrentRoute` hook, which can get the current latest route information.

### useParams

Returns the parameters of the dynamic route

```ts
import { useParams } from "react-router";

const { id: templateId } = useParams<{ id: string }>();
```

### useNavigate

Route navigation

```ts
import { useNavigate } from "react-router";

const navigate = useNavigate();
navigate("/path");
```

### useLocation

Returns the current location object

```ts
import { useLocation } from "react-router";

const location = useLocation();
console.log(location);
// Output: { pathname: '/path', search: '?x=1&y=2', hash: '', state: null, key: 'default' }
```

### useSearchParams

Match route query parameters

```ts
import { useSearchParams } from "react-router";

const [searchParams] = useSearchParams();
console.log(searchParams.get("x")); // Output the value of x
```

> It is recommended to use [nuqs](https://nuqs.47ng.com/) instead of useSearchParams for business development. [nuqs](https://nuqs.47ng.com/) can manage **query parameters** as concisely as using useState.

```ts
import { useQueryState } from "nuqs";

const [hello, setHello] = useQueryState("hello", { defaultValue: "" });
```

### useOutlet

Returns the element generated according to the route

```ts
import { useOutlet } from "react-router";

const outlet = useOutlet();
console.log(outlet); // Output: <div>...</div>
```

Route caching is implemented using this API.

## Route Guards and Route Hooks

Route guards and route hooks are defined in `src/router/guard`.

- `auth-guard.tsx` Route guard, used for permission verification
- `common-gurard.ts` No permission verification logic, supports loading animation and other interception functions
