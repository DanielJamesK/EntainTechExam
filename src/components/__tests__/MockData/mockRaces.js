export const mockRaces = Array.from({ length: 20 }, (_, i) => {
    const categoryIds = [
        '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
        '161d9be2-e909-4326-8c2c-35ed71fb460b',
        '4a2788f8-e825-4d36-9894-efd4baf1cfae',
    ];
  
    return {
        race_id: (i + 1).toString(),
        category_id: categoryIds[i % 3],
        meeting_name: `Meet ${i + 1}`,
        race_number: i + 1,
        advertised_start: {
            seconds: 1744862220 + i * 60,
        },
    };
});
  