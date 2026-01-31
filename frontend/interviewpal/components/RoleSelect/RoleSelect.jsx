import "./RoleSelect.css"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setRoleAndCompany } from "../../redux/onboardingSlice"
import { createClient } from "@supabase/supabase-js"

function RoleSelect() {

    const [roles, setRoles] = useState([])

    const SUPABASE_URL= "https://aewprocgsalwxthnrvao.supabase.co"
    const SUPABASE_KEY= "sb_publishable_7jjIR9fZ5-QgcNFoDTY92w_RimIhRxf"
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // Function to fetch roles
    async function fetchRoles() {
        const { data, error } = await supabase
            .from('roles')
            .select('*');

        if (error) {
            console.error('Error fetching roles:', error);
            return [];
        }

        return data;
    }

    useEffect(() => {
        fetchRoles().then((roles) => {
            console.log(roles)
            setRoles(roles)
        })
    }, [])

    const { selectedRole, selectedCompany } = useSelector((state) => state.onboarding)
    const dispatch = useDispatch()

    const optionClickHandler = (role) => {
        dispatch(setRoleAndCompany(role))
    }

    const selectedOption = selectedRole ? (selectedRole + ", " + selectedCompany) : null

    return (
        <div className="inputRow">
            <div className="selectWrapper">
                <input type="button" name="answerSelect" value={selectedOption || "Pick your desired role..."} className="answerSelect" />
                <div className="selectionList">
                    {roles.map((role) => {
                        const option = role.role_name + ", " + role.company
                        return <p key={option} onClick={() => optionClickHandler(role)}>{option}</p>
                    })}
                </div>
            </div>
        </div>
    )
}

export default RoleSelect