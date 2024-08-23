export interface Order {
    id: number,
    description: string
}

export interface UserRole {
    id: string,
    description: string
}

export interface Restaurant {
    restaurant_id: string,
    restaurant_name: string,
    restaurant_description: string,
    restaurant_cuisine: string[],
    restaurant_type: string,
    restaurant_food_offered?: string,
    restaurant_address: string,
    restaurant_rating?: number,
    restaurant_image? : string,
    active: boolean,
    restaurant_menu?: Restaurant_Menu
}

export interface Restaurant_Menu {
    item_id: number,
    item_description: string,
    price: number
}

export interface Restaurant_Form {
    item_desc: string
}

export interface Restaurant_Action {
    id: number,
    active: boolean,
    desc: string
}