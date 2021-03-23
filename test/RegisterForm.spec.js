import { render, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom';
import RegisterForm from '@/components/RegisterForm.vue';
import axios from 'axios';
describe('RegisterForm', () => {

    it('render title with default props', () => {
        const props = {
            title: 'My Register',
        };
        const { getByTestId } = render(RegisterForm, { props });
        expect(getByTestId('title').textContent).toBe(props.title);
    });

    it('render and input username', async () => {
        const { getByTestId } = render(RegisterForm);
        const userNameInput = getByTestId('username');
        const username = 'testuser';
        await fireEvent.update(userNameInput, username);
        expect(userNameInput.value).toBe(username);
      });

      it('can submit to register new user', async () => {
        axios.post = jest.fn().mockReturnValue({
          status: 201
        });
        const { getByTestId } = render(RegisterForm);
        const username = 'username';
        const password = 'password';
        await fireEvent.update(getByTestId('username'), username);
        await fireEvent.update(getByTestId('password'), password);
        await fireEvent.click(getByTestId('registerBtn'));
        expect(axios.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts',
        {
          username,
          password,
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      });
})