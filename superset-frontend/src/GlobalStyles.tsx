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
import React from 'react';
import { css } from '@superset-ui/core';
import { Global } from '@emotion/react';
import { mix } from 'polished';
import 'react-js-cron/dist/styles.css';

export const GlobalStyles = () => (
  <Global
    styles={theme => css`
      /* WCAG Focus Styles - Visible focus indicators for all interactive elements */
      *:focus-visible {
        outline: 2px solid ${theme.colors.primary.base};
        outline-offset: 2px;
      }

      /* Remove default focus outline and use focus-visible */
      *:focus:not(:focus-visible) {
        outline: none;
      }

      /* Screen reader only utility class */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      /* Skip link styles - visible on focus */
      .a11y-skip-link {
        position: absolute;
        top: -100px;
        left: 0;
        background: ${theme.colors.primary.dark1};
        color: ${theme.colors.grayscale.light5};
        padding: ${theme.gridUnit * 3}px ${theme.gridUnit * 4}px;
        z-index: 10000;
        text-decoration: none;
        font-weight: ${theme.typography.weights.bold};
        transition: top 0.2s ease-in-out;

        &:focus,
        &:focus-visible {
          top: 0;
          outline: 3px solid ${theme.colors.primary.light1};
          outline-offset: 2px;
        }
      }

      /* Main content landmark */
      #main-content {
        min-height: calc(100vh - 60px);
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      strong,
      th {
        font-weight: ${theme.typography.weights.bold};
      }
      // TODO: Remove when on Ant Design 5.
      // Check src/components/Modal for more info.
      .modal-functions-ok-button {
        border-radius: ${theme.borderRadius}px;
        background: ${theme.colors.primary.base};
        border: none;
        text-transform: uppercase;
        color: ${theme.colors.grayscale.light5};
        line-height: 1.5715;
        font-size: ${theme.typography.sizes.s}px;
        font-weight: ${theme.typography.weights.bold};
        &:hover {
          background: ${theme.colors.primary.dark1};
        }
      }
      .modal-functions-cancel-button {
        border-radius: ${theme.borderRadius}px;
        background: ${theme.colors.primary.light4};
        border: none;
        text-transform: uppercase;
        color: ${theme.colors.primary.dark1};
        line-height: 1.5715;
        font-size: ${theme.typography.sizes.s}px;
        font-weight: ${theme.typography.weights.bold};
        &:hover {
          background: ${mix(
            0.1,
            theme.colors.primary.base,
            theme.colors.primary.light4,
          )};
        }
      }
      .column-config-popover {
        & .ant-input-number {
          width: 100%;
        }
        && .btn-group svg {
          line-height: 0;
          top: 0;
        }
        & .btn-group > .btn {
          padding: 5px 10px 6px;
        }
        && .ant-tabs {
          margin-top: ${theme.gridUnit * -3}px;
        }
        & .ant-tabs-nav {
          margin-left: ${theme.gridUnit * -4}px;
          margin-right: ${theme.gridUnit * -4}px;
          margin-bottom: ${theme.gridUnit * 2}px;
        }
        && .ant-tabs-tab {
          flex: 1;
          margin-right: 0;
        }
      }
    `}
  />
);
