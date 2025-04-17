import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { mockRaces } from '@/components/__tests__/MockData/mockRaces';
import NextToGoRaces from '@/components/NextToGoRaces.vue';

vi.mock('@/components/RaceCard.vue', () => ({
    default: {
        name: 'RaceCard',
        template: '<div class="mock-race-card" />',
    },
}));

const filterOptions = [
    {
        id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
        active: true,
    },
    {
        id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
        active: true,
    },
    {
        id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
        active: true,
    },
];

const activeIds = filterOptions
    .filter(({ active }) => active)
    .map(({ id}) => id);

const filteredRaces = mockRaces
    .filter(race => activeIds.includes(race.category_id))
    .slice(0, 5);

const filterOptionsTestCases = [
    {
        title: 'Only Greyhound races active',
        filterOptions: [
        { id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61', active: true },
        { id: '161d9be2-e909-4326-8c2c-35ed71fb460b', active: false },
        { id: '4a2788f8-e825-4d36-9894-efd4baf1cfae', active: false },
        ],
        expectedIds: [
            '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
        ],
    },
    {
        title: 'Greyhound and Harness races active',
        filterOptions: [
        { id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61', active: true },
        { id: '161d9be2-e909-4326-8c2c-35ed71fb460b', active: true },
        { id: '4a2788f8-e825-4d36-9894-efd4baf1cfae', active: false },
        ],
        expectedIds: [
            '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
            '161d9be2-e909-4326-8c2c-35ed71fb460b',
        ],
    },
    {
        title: 'Thoroughbred and Harness races active',
        filterOptions: [
        { id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61', active: false },
        { id: '161d9be2-e909-4326-8c2c-35ed71fb460b', active: true },
        { id: '4a2788f8-e825-4d36-9894-efd4baf1cfae', active: true },
        ],
        expectedIds: [
            '4a2788f8-e825-4d36-9894-efd4baf1cfae',
            '161d9be2-e909-4326-8c2c-35ed71fb460b',
        ],
    },
    {
        title: 'All racing options active',
        filterOptions: [
        { id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61', active: true },
        { id: '161d9be2-e909-4326-8c2c-35ed71fb460b', active: true },
        { id: '4a2788f8-e825-4d36-9894-efd4baf1cfae', active: true },
        ],
        expectedIds: [
            '4a2788f8-e825-4d36-9894-efd4baf1cfae',
            '161d9be2-e909-4326-8c2c-35ed71fb460b',
            '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
        ],
    },
];

describe('NextToGoRaces.vue', () => {
    it('It should render 5 races at all times. If their are less than 5 races after the filters have been applied, it will source the rest of the races from all of the races available.', () => {
        const wrapper = mount(NextToGoRaces, {
            props: {
                nextToGoRaces: filteredRaces,
                allRaces: mockRaces,
                racesLoading: false,
                filterOptions,
                handleRaceFilter: vi.fn(),
                removeRace: vi.fn(),
            },
        });

        const raceCards = wrapper.findAllComponents({ name: 'RaceCard' });
        expect(raceCards.length).toBe(5);
    });
    it('It should call the removeRace function with the race that is expired', () => {    
        let localMockRaces = structuredClone(mockRaces);
        const removeRace = vi.fn((raceId) => {
          return localMockRaces = localMockRaces.filter(({ race_id }) => race_id !== raceId);
        });

        localMockRaces[0].advertised_start.seconds = -61000;

        const expiredRace = localMockRaces.find(({ advertised_start }) => advertised_start.seconds <= -61000);
        if(!expiredRace) expect(removeRace).not.toHaveBeenCalled();
        removeRace(expiredRace.race_id);
        expect(removeRace).toHaveBeenCalledWith(expiredRace.race_id);
        expect(localMockRaces).not.toContainEqual(expiredRace);
    });
    it('It should not call the removeRace function as no races should be expired', () => {
        let localMockRaces = structuredClone(mockRaces);
        const removeRace = vi.fn((raceId) => {
          return localMockRaces = localMockRaces.filter(({ race_id }) => race_id !== raceId);
        });

        const expiredProduct = mockRaces.find(({ advertised_start }) => advertised_start.seconds <= -61000);
        expect(removeRace).not.toHaveBeenCalled();
        expect(expiredProduct).toBe(undefined);
    });
    it.fails('Fails intentionally as there are not at least 5 races to show', () => {
        let localMockRaces = structuredClone(mockRaces);
        const twoRaces = localMockRaces.slice(0, 2);
        const wrapper = mount(NextToGoRaces, {
            props: {
                nextToGoRaces:twoRaces,
                allRaces: twoRaces,
                racesLoading: false,
                filterOptions,
                handleRaceFilter: vi.fn(),
                removeRace: vi.fn(),
            },
        });

        const raceCards = wrapper.findAllComponents({ name: 'RaceCard' });
        expect(raceCards.length).toBe(5);
    });
    describe.each(filterOptionsTestCases)('$title', ({ filterOptions, expectedIds }) => {
        it('filters races based on active category_ids', () => {
            let localMockRaces = structuredClone(mockRaces);
            const activeIds = filterOptions
                .filter(({ active }) => active)
                .map(({ id }) => id);
        
            const filteredRaces = localMockRaces.filter(({ category_id}) => activeIds.includes(category_id));
        
            filteredRaces.forEach((race) => expect(expectedIds).toContain(race.category_id));
        });
    });
});
