import auth from "./Auth/index.route.jsx";
export default function route() {
    return [
        ...auth(),
    ]
}
