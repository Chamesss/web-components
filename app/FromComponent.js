import { useFormState, useFormStatus } from 'react-dom'

const initialState = {
    response: {
        success: null,
        message: null
    }
}

const addUser = async (prevState, formData) => {
    "use server"
    const title = formData.get('username')
    const password = formData.get('password')
    if (!title) return { response: { success: false, message: "specify a title" } }
    if (!password) return { response: { success: false, message: "specify a password" } }
    return { response: { success: true, message: "good job" } }
}


function Form({ formState }) {
    const status = useFormStatus()
    return (
        <div>
            <input name="username" />
            <input name="password" />
            <button type="submit">{status.pending ? "loading..." : "submit"}</button>
            {formState.response.success ? <p>Success</p> : <p>{formState.response.message}</p>}
        </div>
    )
}

export default function FromComponent() {
    const [formState, formAction] = useFormState(addUser, initialState);

    return (
        <div>
            <form action={formAction}>
                <Form formState={formState} />
            </form>
        </div>
    )
}
