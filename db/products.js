const productsDb = {
    async getAll() {
        const { data, error } = await window.supabase
            .from('products')
            .select('*, brands(*)')
            .order('order_explore', { ascending: true });
        if (error) throw error;
        return data;
    },

    async getSpotlight() {
        const { data, error } = await window.supabase
            .from('products')
            .select('*, brands(*)')
            .eq('is_spotlight', true)
            .order('order_spotlight', { ascending: true });
        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await window.supabase
            .from('products')
            .select('*, brands(*)')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    },

    async create(product) {
        const { data, error } = await window.supabase
            .from('products')
            .insert(product)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async update(id, product) {
        const { data, error } = await window.supabase
            .from('products')
            .update(product)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async delete(id) {
        const { error } = await window.supabase
            .from('products')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    async updateOrder(id, type, order) {
        const column = type === 'spotlight' ? 'order_spotlight' : 'order_explore';
        const { error } = await window.supabase
            .from('products')
            .update({ [column]: order })
            .eq('id', id);
        if (error) throw error;
    }
};

window.productsDb = productsDb;
