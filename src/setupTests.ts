// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Suppress known harmless warnings in tests
// - ReactDOMTestUtils.act deprecation (known issue in @testing-library/react)
// - SVG tag warnings (false positives - SVG elements are valid)
const originalError = console.error;
beforeAll(() => {
    console.error = (...args: any[]) => {
        if (
            typeof args[0] === 'string' &&
            (args[0].includes('ReactDOMTestUtils.act') ||
                args[0].includes('The tag <') && args[0].includes('> is unrecognized in this browser'))
        ) {
            return;
        }
        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
});
