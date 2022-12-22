import { test, expect } from '@playwright/experimental-ct-vue';
import StarRatingComponent from '../../src/components/StarRatingComponent.vue';

const STARS_TOTAL = 5
const RATING_MAX = 5
const RATING_MIN = 0
const STAR_ACTIVE_SELECTOR = '.active'
const STAR_INACTIVE_SELECTOR = '.inactive'

test.describe('StarRatingComponent', () => {
    let stars, activeStars, inactiveStars
    test.describe('Valid data', () => {
        test.describe('min value', () => {
            test.beforeAll(async ({mount}) => {
                stars = RATING_MIN
                const component = await mount(StarRatingComponent, {
                    props: {
                        rating: stars
                    }
                })
                activeStars = await component.locator(STAR_ACTIVE_SELECTOR).count()
                inactiveStars = await component.locator(STAR_INACTIVE_SELECTOR).count()
            })
            test('active stars quantity', async () => {
                await expect(activeStars).toEqual(stars);
            });
            test('inactive stars quantity', async () => {
                await expect(inactiveStars).toEqual(STARS_TOTAL - stars);
            });
        })
        test.describe('max value', () => {
            test.beforeAll(async ({mount}) => {
                stars = RATING_MAX
                const component = await mount(StarRatingComponent, {
                    props: {
                        rating: stars
                    }
                })
                activeStars = await component.locator(STAR_ACTIVE_SELECTOR).count()
                inactiveStars = await component.locator(STAR_INACTIVE_SELECTOR).count()
            })
            test('active stars quantity', async () => {
                await expect(activeStars).toEqual(stars);
            });
            test('inactive stars quantity', async () => {
                await expect(inactiveStars).toEqual(STARS_TOTAL - stars);
            });
        })
    })
    test.describe('Invalid data', () => {
        test.describe('less then min value', () => {
            test.beforeAll(async ({mount}) => {
                stars = RATING_MIN - 1
                const component = await mount(StarRatingComponent, {
                    props: {
                        rating: stars
                    }
                })
                activeStars = await component.locator(STAR_ACTIVE_SELECTOR).count()
                inactiveStars = await component.locator(STAR_INACTIVE_SELECTOR).count()
            })
            test('active stars quantity', async ({mount}) => {
                await expect(activeStars).toEqual(RATING_MIN);
            });
            test('inactive stars quantity', async ({mount}) => {
                await expect(inactiveStars).toEqual(STARS_TOTAL);
            });
        })
        test.describe('more then max value', () => {
            test.beforeAll(async ({mount}) => {
                stars = RATING_MAX + 1
                const component = await mount(StarRatingComponent, {
                    props: {
                        rating: stars
                    }
                })
                activeStars = await component.locator(STAR_ACTIVE_SELECTOR).count()
                inactiveStars = await component.locator(STAR_INACTIVE_SELECTOR).count()
            })
            test('active stars quantity', async ({mount}) => {
                await expect(activeStars).toEqual(RATING_MAX);
            });
            test('inactive stars quantity', async ({mount}) => {
                await expect(inactiveStars).toEqual(0);
            });
        })
    })
})

