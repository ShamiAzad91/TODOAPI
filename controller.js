const axios = require('axios').default;

exports.getTodos = async (req, res) => {
    try {
        let response = await gettodosFromURl()
        if (response.error) {
            return res.status(500).json({
                error: true,
                message: error.message
            })
        }
        return res.status(200).json([...response.message])
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error?.message ? error.message : "Internal server error"
        })
    }
}

exports.getUserAndTodos = async (req, res) => {
    try {
        const userId = req.params.id

        let response = await getUserTodos(Number(userId))
        if (response.error) {
            return res.status(500).json({
                error: true,
                message: error.message
            })
        }
        return res.status(200).json({...response.message})
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error?.message ? error.message : "Internal server error"
        })
    }
}

const gettodosFromURl = async () => {
    try {
        const newTodos = []
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        response.data.forEach(element => {
            newTodos.push({
                id: element.id,
                title: element.title,
                completed: element.completed
            })
        });
        return {
            error: false,
            message: newTodos
        }
    } catch (error) {
        console.error(error);
        return {
            error: true,
            message: error?.message ? error.message : "Error in getting todos from url."
        }
    }
}

/**
 * 
 * @param {Integer} userId Id of the user whoes todos and details has to be fetched.
 * @returns {Object} Object in form {error , message}
 */
const getUserTodos = async (userId) => {
    try {
        if (!userId) return { error: true, message: "Userid required" }

        const newTodos = {}

         // Get user info
         let userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
         userResponse = userResponse.data
         newTodos['id'] = userResponse.id
         newTodos['name'] = userResponse.name
         newTodos['email'] = userResponse.email
         newTodos['phone'] = userResponse.phone

        // We can filter todos in loop whoes code is commented but i found that ypur api return todos of a particular user so i used that
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
        newTodos['todos'] = response?.data ? response.data : []
  
        // response.data.forEach(element => {
        //     if (element.userId == userId) {
        //         newTodos.push({
        //             id: element.id,
        //             title: element.title,
        //             completed: element.completed
        //         })
        //     }
        // });
        return {
            error: false,
            message: newTodos
        }
    } catch (error) {
        console.error(error);
        return {
            error: true,
            message: error?.message ? error.message : "Error in getting todos from url."
        }
    }
}