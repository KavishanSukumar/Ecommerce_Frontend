export const initialState = {
    cart: [],
}

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case "ADD_ITEM":

            var arr = []
            arr = [...state.cart, payload]

            return {
                cart: arr
            }





    }
}