import {isRouteErrorResponse, useRouteError} from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    const message = isRouteErrorResponse(error) ? error.error.message : error.message;
    return <>
        <h1>Error</h1>
        <p>{message}</p>
    </>;
}

export default ErrorPage;