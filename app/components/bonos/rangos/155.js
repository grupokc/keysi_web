import Image from "next/image";

export default function BonosRangos155({ }) {
    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mt-3 flex flex-col">
                <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                    <div className="bg-white">
                        <div style={{ width: "100%" }}>
                            <Image
                                src="/img/INCENTIVO DE AUTO NUEVO GRUPO KC.png"
                                layout="responsive"
                                width={1200}
                                height={500}
                                alt="auto"
                                quality={100}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
