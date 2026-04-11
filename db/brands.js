const brandsDb = {
    async getAll() {
        const { data, error } = await window.supabase
            .from('brands')
            .select('*')
            .order('name', { ascending: true });
        if (error) throw error;
        return data;
    },

    async create(brand) {
        const { data, error } = await window.supabase
            .from('brands')
            .insert(brand)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async update(id, brand) {
        const { data, error } = await window.supabase
            .from('brands')
            .update(brand)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async delete(id) {
        const { error } = await window.supabase
            .from('brands')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }
};

window.brandsDb = brandsDb;
