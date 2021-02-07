import dependencyCheck from '../../dependencyCheck';

const dependencies = ['library1', 'library2', 'library1', 'library2', 'library1', 'library2', 'library1', 'library2'];
test('3 unused dependencies, return score 1', () => {
    let arr = dependencies.slice(0, 3);
    expect(dependencyCheck.calculateRepoScore(arr)).toBe(1);
});
test('8 unused dependencies, return score 2', () => {
    expect(dependencyCheck.calculateRepoScore(dependencies)).toBe(2);
});

it('asdf', () => {
    
})
it('check to dto response', () => {
    try {
        dependencyCheck.toDTO(null, 8)
        fail('It shouldn\'t pass');
    } catch (error) {
        console.log('It never came here!');
    }
})