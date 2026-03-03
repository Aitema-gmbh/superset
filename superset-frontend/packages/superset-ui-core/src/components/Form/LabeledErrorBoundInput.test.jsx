/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { render, fireEvent, screen } from '@superset-ui/core/spec';
import { LabeledErrorBoundInput } from './LabeledErrorBoundInput';

const defaultProps = {
  id: 1,
  label: 'Username',
  name: 'Username',
  validationMethods: () => {},
  errorMessage: '',
  helpText: 'This is a line of example help text',
  hasTooltip: false,
  tooltipText: 'This is a tooltip',
  value: '',
  placeholder: 'Example placeholder text...',
  type: 'textbox',
};

describe('LabeledErrorBoundInput', () => {
  it('renders a LabeledErrorBoundInput normally, without an error', () => {
    render(<LabeledErrorBoundInput {...defaultProps} />);

    const label = screen.getByText(/username/i);
    const textboxInput = screen.getByRole('textbox');
    const helperText = screen.getByText('This is a line of example help text');

    expect(label).toBeVisible();
    expect(textboxInput).toBeVisible();
    expect(helperText).toBeVisible();
  });

  it('renders a LabeledErrorBoundInput with an error', () => {
    // Pass an error into props, causing errorText to replace helperText
    defaultProps.errorMessage = 'Example error message';
    render(<LabeledErrorBoundInput {...defaultProps} />);

    const label = screen.getByText(/username/i);
    const textboxInput = screen.getByRole('textbox');
    const errorText = screen.getByText(/example error message/i);

    expect(label).toBeVisible();
    expect(textboxInput).toBeVisible();
    expect(errorText).toBeVisible();
  });
  it('renders a LabeledErrorBoundInput with a InfoTooltip', async () => {
    defaultProps.hasTooltip = true;
    render(<LabeledErrorBoundInput {...defaultProps} />);

    const label = screen.getByText(/username/i);
    const textboxInput = screen.getByRole('textbox');
    const tooltipIcon = screen.getAllByRole('img')[0];

    fireEvent.mouseOver(tooltipIcon);

    expect(tooltipIcon).toBeVisible();
    expect(label).toBeVisible();
    expect(textboxInput).toBeVisible();
    expect(await screen.findByText('This is a tooltip')).toBeInTheDocument();
  });

  it('becomes a password input if visibilityToggle prop is passed in', async () => {
    defaultProps.visibilityToggle = true;
    render(<LabeledErrorBoundInput {...defaultProps} />);

    expect(await screen.findByTestId('icon-eye')).toBeVisible();
  });

  it('becomes a password input if props.name === password (backwards compatibility)', async () => {
    defaultProps.name = 'password';
    render(<LabeledErrorBoundInput {...defaultProps} />);

    expect(await screen.findByTestId('icon-eye')).toBeVisible();
  });

  it('WCAG 3.3.1: sets aria-invalid when errorMessage is present', () => {
    render(
      <LabeledErrorBoundInput
        {...defaultProps}
        name="Username"
        visibilityToggle={false}
        errorMessage="Field is required"
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('WCAG 3.3.1: sets aria-describedby linking to error message', () => {
    render(
      <LabeledErrorBoundInput
        {...defaultProps}
        name="Username"
        visibilityToggle={false}
        errorMessage="Field is required"
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', '1-error');
  });

  it('WCAG 3.3.1: renders error message with role="alert"', () => {
    const { container } = render(
      <LabeledErrorBoundInput
        {...defaultProps}
        name="Username"
        visibilityToggle={false}
        errorMessage="Field is required"
      />,
    );
    const alertEl = container.querySelector('[role="alert"]');
    expect(alertEl).toBeInTheDocument();
    expect(alertEl).toHaveTextContent('Field is required');
  });

  it('WCAG 3.3.1: does not set aria-invalid when no error', () => {
    render(
      <LabeledErrorBoundInput
        {...defaultProps}
        name="Username"
        visibilityToggle={false}
        errorMessage=""
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });
});
