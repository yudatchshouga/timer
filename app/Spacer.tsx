'use client';
type SpacerProps = {
  width: string;
};
export const Spacer = (props: SpacerProps) => {
  const { width } = props;
  return (
    <div
      style={{
        width: width,
      }}
    ></div>
  );
};
