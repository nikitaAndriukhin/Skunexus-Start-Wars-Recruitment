import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './PlanetEditForm.css';

const defaultInitialValues = {
  name: '',
  rotation_period: 0,
  orbital_period: 0,
  diameter: 0,
  climate: '',
  gravity: '',
  terrain: '',
  surface_water: 0,
};

function PlanetEditForm({ planet, closeModal }) {
  const {
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
  } = planet || defaultInitialValues;
  const initialValues = {
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const err = {};
        Object.keys(values).forEach((key) => {
          if (!values[key]) err[key] = 'This field is required';
        });
        return err;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          const data = JSON.stringify(values, null, 2);
          alert(`${Math.random() < 0.6 ? 'Success!' : 'Error!'}\nSent data:\n${data}`);
          closeModal()
          setSubmitting(false);
        }, 300);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form" id="formID">
          <label className="label">
            Name:
            <Field name="name" className="input" />
          </label>
          <ErrorMessage name="name" component="div" className="input__error" />

          <label className="label">
            Rotation period:
            <Field name="rotation_period" type="number" className="input" />
          </label>
          <ErrorMessage name="rotation_period" component="div" className="input__error" />

          <label className="label">
            Orbital period:
            <Field name="orbital_period" type="number" className="input" />
          </label>
          <ErrorMessage name="orbital_period" component="div" className="input__error" />

          <label className="label">
            Diameter:
            <Field name="diameter" type="number" className="input" />
          </label>
          <ErrorMessage name="diameter" component="div" className="input__error" />

          <label className="label">
            Climate:
            <Field name="climate" className="input" />
          </label>
          <ErrorMessage name="climate" component="div" className="input__error" />

          <label className="label">
            Gravity:
            <Field name="gravity" className="input" />
          </label>
          <ErrorMessage name="gravity" component="div" className="input__error" />

          <label className="label">
            Terrain:
            <Field as="select" name="terrain">
              <option value="grasslands">grasslands</option>
              <option value="mountains">mountains</option>
              <option value="jungle">jungle</option>
              <option value="rainforests">rainforests</option>
              <option value="other">other</option>
            </Field>
          </label>
          <ErrorMessage name="terrain" component="div" className="input__error" />

          <label className="label">
            Surface water:
            <Field name="surface_water" type="number" className="input" />
          </label>
          <ErrorMessage name="surface_water" component="div" className="input__error" />

          <button type="submit" form="formID" disabled={isSubmitting}>
            <p>Submit</p>
          </button>
        </Form>
      )}
    </Formik>
  );
}

PlanetEditForm.propTypes = {
  planet: PropTypes.shape({
    name: PropTypes.string,
    rotation_period: PropTypes.string,
    orbital_period: PropTypes.string,
    diameter: PropTypes.string,
    climate: PropTypes.string,
    gravity: PropTypes.string,
    terrain: PropTypes.string,
    surface_water: PropTypes.string,
  })
};

export default PlanetEditForm;
