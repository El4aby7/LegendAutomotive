const settingsDb = {
    async getAll() {
        const { data, error } = await window.supabase
            .from('settings')
            .select('*');
        if (error) throw error;

        const settings = {};
        data.forEach(item => {
            settings[item.key] = item.value;
        });
        return settings;
    },

    async update(key, value) {
        const { data, error } = await window.supabase
            .from('settings')
            .upsert({ key, value, updated_at: new Date().toISOString() })
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async updateMultiple(settingsArray) {
        const { data, error } = await window.supabase
            .from('settings')
            .upsert(settingsArray.map(item => ({
                ...item,
                updated_at: new Date().toISOString()
            })))
            .select();
        if (error) throw error;
        return data;
    }
};

window.settingsDb = settingsDb;
